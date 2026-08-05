export default function AdminLoading() {
  return (
    <div style={{
      padding: "60px 20px",
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "50vh"
    }}>
      <div style={{
        width: "44px",
        height: "44px",
        border: "3px solid #e2e8f0",
        borderTopColor: "#0d6e3f",
        borderRadius: "50%",
        animation: "adminSpin 0.8s linear infinite",
        marginBottom: "16px"
      }} />
      <span style={{ fontSize: "14px", color: "#64748b", fontWeight: "500" }}>
        Memuat data admin...
      </span>
      <style>{`
        @keyframes adminSpin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
