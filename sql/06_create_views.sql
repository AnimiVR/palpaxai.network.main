-- 06_create_views.sql
-- Tạo các views để truy vấn dữ liệu dễ dàng hơn

-- View: Thông tin chi tiết wallet của user
CREATE OR REPLACE VIEW public.wallet_details AS
SELECT 
    w.id,
    w.user_id,
    w.wallet_address,
    w.wallet_type,
    w.network,
    w.is_primary,
    w.is_connected,
    w.connected_at,
    w.last_used_at,
    w.created_at,
    w.updated_at,
    (
        SELECT COUNT(*)
        FROM public.wallet_sessions
        WHERE wallet_id = w.id
          AND is_active = true
    ) > 0 as has_active_session
FROM public.wallets w;

-- Enable RLS cho view
ALTER VIEW public.wallet_details SET (security_invoker = true);

-- View: Lịch sử hoạt động wallet gần đây
CREATE OR REPLACE VIEW public.recent_wallet_activity AS
SELECT 
    ws.id,
    ws.wallet_id,
    ws.user_id,
    w.wallet_address,
    ws.action,
    ws.session_started_at,
    ws.session_ended_at,
    ws.is_active,
    ws.created_at
FROM public.wallet_sessions ws
JOIN public.wallets w ON w.id = ws.wallet_id
ORDER BY ws.created_at DESC;

-- Enable RLS cho view
ALTER VIEW public.recent_wallet_activity SET (security_invoker = true);

-- Grant permissions cho views
GRANT SELECT ON public.wallet_details TO authenticated;
GRANT SELECT ON public.recent_wallet_activity TO authenticated;

COMMENT ON VIEW public.wallet_details IS 'View chi tiết thông tin wallet của user';
COMMENT ON VIEW public.recent_wallet_activity IS 'Lịch sử hoạt động wallet gần đây';

