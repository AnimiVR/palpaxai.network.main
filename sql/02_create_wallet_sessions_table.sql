-- 02_create_wallet_sessions_table.sql
-- Tạo bảng lưu lịch sử kết nối/ngắt kết nối ví

CREATE TABLE IF NOT EXISTS public.wallet_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    wallet_id UUID REFERENCES public.wallets(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    action TEXT NOT NULL, -- 'connect', 'disconnect', 'reconnect'
    ip_address INET,
    user_agent TEXT,
    session_started_at TIMESTAMPTZ DEFAULT NOW(),
    session_ended_at TIMESTAMPTZ,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tạo index
CREATE INDEX IF NOT EXISTS idx_wallet_sessions_wallet_id ON public.wallet_sessions(wallet_id);
CREATE INDEX IF NOT EXISTS idx_wallet_sessions_user_id ON public.wallet_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_wallet_sessions_is_active ON public.wallet_sessions(is_active) 
    WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_wallet_sessions_created_at ON public.wallet_sessions(created_at DESC);

-- Enable RLS
ALTER TABLE public.wallet_sessions ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view own wallet sessions"
    ON public.wallet_sessions
    FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own wallet sessions"
    ON public.wallet_sessions
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own wallet sessions"
    ON public.wallet_sessions
    FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Comment
COMMENT ON TABLE public.wallet_sessions IS 'Lịch sử kết nối/ngắt kết nối ví của người dùng';
COMMENT ON COLUMN public.wallet_sessions.action IS 'Hành động: connect, disconnect, reconnect';


