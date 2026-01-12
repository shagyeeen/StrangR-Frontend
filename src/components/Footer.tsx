const Footer = () => {
  return (
    <div
      style={{
        position: "fixed",
        bottom: "12px",
        width: "100%",
        textAlign: "center",
        fontSize: "12px",
        color: "rgba(255,255,255,0.55)",
        backdropFilter: "blur(6px)",
        padding: "6px 0",
        fontFamily: "Inter, sans-serif",
        zIndex: 50,
      }}
    >
      Powered by{" "}
      <a
        href="https://shyne-hostings.web.app/"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          color: "rgba(120,180,255,0.8)",
          textDecoration: "none",
        }}
      >
        Shyne Web Hosters
      </a>
    </div>
  );
};

export default Footer;