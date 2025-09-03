import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { AsyncLocalStorageContextManager } from '@opentelemetry/context-async-hooks';
import {
  CompositePropagator,
  W3CBaggagePropagator,
  W3CTraceContextPropagator,
} from '@opentelemetry/core';
import { PrometheusExporter } from '@opentelemetry/exporter-prometheus';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { PinoInstrumentation } from '@opentelemetry/instrumentation-pino';
import { resourceFromAttributes } from '@opentelemetry/resources';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions';

import { environmentConfiguration } from '../environment.configuration.ts';

export function loadTracingIntoProcess() {
  const otelSDK = new NodeSDK({
    resource: resourceFromAttributes({
      [ATTR_SERVICE_NAME]: environmentConfiguration.TELEMETRY_SERVICE_NAME,
    }),
    metricReader: new PrometheusExporter({
      port: environmentConfiguration.TELEMETRY_PROMETHEUS_PORT,
      endpoint: '/metrics',
    }),
    spanProcessor: new BatchSpanProcessor(
      new OTLPTraceExporter({
        url: environmentConfiguration.TELEMETRY_OTLP_URL,
      }),
    ),
    contextManager: new AsyncLocalStorageContextManager(),
    textMapPropagator: new CompositePropagator({
      propagators: [
        new W3CTraceContextPropagator(),
        new W3CBaggagePropagator(),
      ],
    }),
    instrumentations: [
      new PinoInstrumentation(),
      getNodeAutoInstrumentations(),
    ],
  });

  otelSDK.start();

  process.once('SIGTERM', () => {
    void otelSDK
      .shutdown()
      .then(
        // biome-ignore lint/suspicious/noConsole: the global logger might not be available to use here
        () => console.debug('SDK shut down successfully'),
        // biome-ignore lint/suspicious/noConsole: the global logger might not be available to use here
        (err) => console.error('Error shutting down SDK', err),
      )
      .finally(() => process.exit(0));
  });
}
