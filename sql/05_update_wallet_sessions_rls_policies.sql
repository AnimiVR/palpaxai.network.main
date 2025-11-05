-- 05_update_wallet_sessions_rls_policies.sql
-- Update RLS policies for wallet_sessions to allow anonymous users to create sessions
-- This allows tracking wallet connections before user authentication

-- Drop existing policies first
DROP POLICY IF EXISTS "Users can view own wallet sessions" ON public.wallet_sessions;
DROP POLICY IF EXISTS "Users can insert own wallet sessions" ON public.wallet_sessions;
DROP POLICY IF EXISTS "Users can update own wallet sessions" ON public.wallet_sessions;

-- Policy: Users can view their own wallet sessions OR sessions with null user_id
CREATE POLICY "Users can view own wallet sessions or temporary sessions"
    ON public.wallet_sessions
    FOR SELECT
    USING (
        auth.uid() = user_id OR 
        user_id IS NULL
    );

-- Policy: Users can insert sessions with their own user_id OR with null user_id (temporary)
-- This allows tracking wallet connections before user authentication
CREATE POLICY "Users can insert wallet sessions"
    ON public.wallet_sessions
    FOR INSERT
    WITH CHECK (
        (auth.uid() IS NOT NULL AND auth.uid() = user_id) OR
        user_id IS NULL
    );

-- Policy: Users can update their own wallet sessions OR sessions with null user_id
-- This allows updating temporary sessions (e.g., when user signs up later)
CREATE POLICY "Users can update own wallet sessions or temporary sessions"
    ON public.wallet_sessions
    FOR UPDATE
    USING (
        (auth.uid() IS NOT NULL AND auth.uid() = user_id) OR
        user_id IS NULL
    )
    WITH CHECK (
        (auth.uid() IS NOT NULL AND auth.uid() = user_id) OR
        user_id IS NULL
    );

-- Comments
COMMENT ON POLICY "Users can view own wallet sessions or temporary sessions" ON public.wallet_sessions IS 
    'Allow viewing wallet sessions owned by user or temporary sessions (null user_id)';
COMMENT ON POLICY "Users can insert wallet sessions" ON public.wallet_sessions IS 
    'Allow inserting wallet sessions with user_id or null (for pre-auth wallet tracking)';
COMMENT ON POLICY "Users can update own wallet sessions or temporary sessions" ON public.wallet_sessions IS 
    'Allow updating owned wallet sessions or temporary sessions (for linking sessions after auth)';

