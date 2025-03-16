CREATE TABLE users (
    id UUID PRIMARY KEY REFERENCES auth.users(id),
    username VARCHAR,
    email VARCHAR NOT NULL UNIQUE,
    premium BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now(),
    deleted_at TIMESTAMP
);

CREATE TABLE expenses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR NOT NULL,
    amount NUMERIC(10,2) NOT NULL, 
    method VARCHAR NOT NULL,
    category VARCHAR NOT NULL,
    subcategory VARCHAR NOT NULL,
    description TEXT, 
    date TIMESTAMP NOT NULL,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,  -- ensuring referential integrity
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now(),
    deleted_at TIMESTAMP
);

CREATE INDEX idx_expenses_user_id ON expenses(user_id);