-- Tenants table (for boot sequence)
CREATE TABLE tenants (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  status VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Workers table (mirrors mock server, used for local operations)
CREATE TABLE workers (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  status VARCHAR(50) DEFAULT 'idle',
  token_budget INTEGER DEFAULT 10000,
  version INTEGER DEFAULT 1,
  last_active TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Seed tenants
INSERT INTO tenants (id, name, status) VALUES
  ('550e8400-e29b-41d4-a716-446655440000', 'Acme Corp', 'inactive'),
  ('6ba7b810-9dad-11d1-80b4-00c04fd430c8', 'Nano Demo', 'active'),
  ('6ba7b811-9dad-11d1-80b4-00c04fd430c9', 'Test Tenant', 'suspended');

-- Seed workers (same IDs as mock server)
INSERT INTO workers (id, name, status, token_budget) VALUES
  ('a1b2c3d4-0000-0000-0000-000000000001', 'Agent Alpha', 'idle', 10000),
  ('a1b2c3d4-0000-0000-0000-000000000002', 'Agent Beta', 'busy', 8500),
  ('a1b2c3d4-0000-0000-0000-000000000003', 'Agent Gamma', 'idle', 12000),
  ('a1b2c3d4-0000-0000-0000-000000000004', 'Agent Delta', 'offline', 5000),
  ('a1b2c3d4-0000-0000-0000-000000000005', 'Agent Epsilon', 'idle', 15000);


