-- migrate:up

CREATE OR REPLACE FUNCTION update_timestamp_function()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW(); -- Assuming 'updated_at' is the column to be updated
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- migrate:down

DROP FUNCTION IF EXISTS update_timestamp_function();

