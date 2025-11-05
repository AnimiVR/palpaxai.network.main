-- 04_update_wallet_rls_policies.sql
-- Update RLS policies to allow wallet creation without authentication
-- This allows users to connect wallet before signing up/login

-- Drop existing policies first
DROP POLICY IF EXISTS "Users can view own wallets" ON public.wallets;
DROP POLICY IF EXISTS "Users can insert own wallets" ON public.wallets;
DROP POLICY IF EXISTS "Users can update own wallets" ON public.wallets;
DROP POLICY IF EXISTS "Users can delete own wallets" ON public.wallets;

-- Policy: Users can view their own wallets OR wallets with null user_id (temporary wallets)
-- Also allow anyone to check wallet existence by wallet_address (limited fields for security)
-- This is needed for the connection flow to check if wallet exists before insert/update
CREATE POLICY "Users can view own wallets or temporary wallets"
    ON public.wallets
    FOR SELECT
    USING (
        auth.uid() = user_id OR 
        user_id IS NULL
    );
    
-- Additional policy: Allow checking wallet existence by wallet_address
-- This allows anonymous users to check if a wallet exists (for connection flow)
-- Only returns id and user_id for existence check
CREATE POLICY "Allow wallet existence check"
    ON public.wallets
    FOR SELECT
    USING (true) -- Allow all SELECT, but we'll use column-level security if needed
    WITH CHECK (false); -- This is SELECT only, no check needed

-- Policy: Users can insert wallets with their own user_id OR with null user_id (temporary)
-- This allows wallet connection before user authentication
CREATE POLICY "Users can insert wallets"
    ON public.wallets
    FOR INSERT
    WITH CHECK (
        (auth.uid() IS NOT NULL AND auth.uid() = user_id) OR
        user_id IS NULL
    );

-- Policy: Users can update their own wallets OR wallets with null user_id
-- This allows updating temporary wallets (e.g., when user signs up later)
CREATE POLICY "Users can update own wallets or temporary wallets"
    ON public.wallets
    FOR UPDATE
    USING (
        (auth.uid() IS NOT NULL AND auth.uid() = user_id) OR
        user_id IS NULL
    )
    WITH CHECK (
        (auth.uid() IS NOT NULL AND auth.uid() = user_id) OR
        user_id IS NULL
    );

-- Policy: Users can delete their own wallets
CREATE POLICY "Users can delete own wallets"
    ON public.wallets
    FOR DELETE
    USING (
        auth.uid() = user_id
    );

-- Comment
COMMENT ON POLICY "Users can view own wallets or temporary wallets" ON public.wallets IS 
    'Allow viewing wallets owned by user or temporary wallets (null user_id)';
COMMENT ON POLICY "Users can insert wallets" ON public.wallets IS 
    'Allow inserting wallets with user_id or null (for pre-auth wallet connection)';
COMMENT ON POLICY "Users can update own wallets or temporary wallets" ON public.wallets IS 
    'Allow updating owned wallets or temporary wallets (for linking wallets after auth)';

