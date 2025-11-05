-- 01_create_wallets_table.sql
-- Tạo bảng lưu thông tin ví của người dùng

-- Tạo bảng wallets
CREATE TABLE IF NOT EXISTS public.wallets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    wallet_address TEXT NOT NULL,
    wallet_type TEXT DEFAULT 'phantom', -- phantom, solflare, backpack, etc.
    network TEXT DEFAULT 'solana', -- solana, ethereum, etc.
    is_primary BOOLEAN DEFAULT false,
    is_connected BOOLEAN DEFAULT false,
    connected_at TIMESTAMPTZ,
    last_used_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Đảm bảo wallet_address là unique
    CONSTRAINT unique_wallet_address UNIQUE (wallet_address)
);

-- Tạo index để tìm kiếm nhanh
CREATE INDEX IF NOT EXISTS idx_wallets_user_id ON public.wallets(user_id);
CREATE INDEX IF NOT EXISTS idx_wallets_wallet_address ON public.wallets(wallet_address);
CREATE INDEX IF NOT EXISTS idx_wallets_is_primary ON public.wallets(user_id, is_primary) 
    WHERE is_primary = true;

-- Tạo function để tự động cập nhật updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Tạo trigger để tự động cập nhật updated_at
CREATE TRIGGER update_wallets_updated_at
    BEFORE UPDATE ON public.wallets
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE public.wallets ENABLE ROW LEVEL SECURITY;

-- Tạo policies cho RLS
-- Policy: Users can view their own wallets
CREATE POLICY "Users can view own wallets"
    ON public.wallets
    FOR SELECT
    USING (auth.uid() = user_id);

-- Policy: Users can insert their own wallets
CREATE POLICY "Users can insert own wallets"
    ON public.wallets
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own wallets
CREATE POLICY "Users can update own wallets"
    ON public.wallets
    FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Policy: Users can delete their own wallets
CREATE POLICY "Users can delete own wallets"
    ON public.wallets
    FOR DELETE
    USING (auth.uid() = user_id);

-- Comment trên bảng
COMMENT ON TABLE public.wallets IS 'Lưu thông tin ví của người dùng';
COMMENT ON COLUMN public.wallets.wallet_address IS 'Địa chỉ ví (public key)';
COMMENT ON COLUMN public.wallets.wallet_type IS 'Loại ví: phantom, solflare, backpack, etc.';
COMMENT ON COLUMN public.wallets.is_primary IS 'Ví chính của người dùng';
COMMENT ON COLUMN public.wallets.is_connected IS 'Trạng thái kết nối hiện tại';

