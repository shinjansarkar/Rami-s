import AdminAuth from '@/components/AdminAuth';

export const metadata = {
  title: "Admin Atelier | Romi's Saree",
  description: "Admin dashboard for Romi's saree inventory management.",
};

export default function AdminLayout({ children }) {
  return (
    <div style={{ background: '#faf7ff', color: '#1a0030', minHeight: '100vh' }}>
      <AdminAuth>
        {children}
      </AdminAuth>
    </div>
  );
}
