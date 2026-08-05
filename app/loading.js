export default function Loading() {
  return (
    <div style={{
      minHeight: "60vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 20px",
      backgroundColor: "#f8fafc"
    }}>
      <div style={{
        position: "relative",
        width: "60px",
        height: "60px",
        marginBottom: "20px"
      }}>
        <div style={{
          boxSizing: "border-box",
          display: "block",
          position: "absolute",
          width: "50px",
          height: "50px",
          margin: "5px",
          border: "4px solid #10b981",
          borderRadius: "50%",
          animation: "spin 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite",
          borderColor: "#10b981 transparent transparent transparent"
        }} />
      </div>
      <p style={{
        color: "#0d6e3f",
        fontSize: "15px",
        fontWeight: "600",
        margin: 0,
        letterSpacing: "0.3px",
        animation: "pulse 1.5s infinite"
      }}>
        Memuat Al-Bahjah Cirebon...
      </p>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}
