-- migrate:up

CREATE TABLE short_codes (
  id BIGSERIAL PRIMARY KEY,
  uuid UUID NOT NULL,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  short_code VARCHAR(10) NOT NULL UNIQUE,
  destination_url VARCHAR(2048) NOT NULL
);

CREATE TRIGGER set_updated_timestamp
  BEFORE UPDATE ON short_codes
  FOR EACH ROW
  EXECUTE PROCEDURE update_timestamp_function()

-- migrate:down

DROP TABLE IF EXISTS short_codes;
