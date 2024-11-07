-- Add isAdmin column to users table
ALTER TABLE users ADD COLUMN is_admin BOOLEAN NOT NULL DEFAULT FALSE;

-- Create index for better performance
CREATE INDEX idx_users_is_admin ON users(is_admin);