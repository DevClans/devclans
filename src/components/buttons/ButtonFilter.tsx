"use client";
const ButtonFilter = () => {
  return (
    <button
      onClick={(e) => {
        const filter = document.getElementById("filterMenu");
        if (filter) {
          filter.style.display = "flex";
        }
      }}
      style={{
        //   background:
        // "linear-gradient(0deg, rgba(231, 239, 255, 0.04) 0%, rgba(230, 239, 255, 0.00) 100%, rgba(231, 239, 255, 0.00) 100%), rgba(2, 12, 32, 0.08)",
        boxShadow:
          "0px 4px 5.3px 0px rgba(20, 26, 37, 0.20) inset, 0px -4px 3px 0px rgba(6, 12, 24, 0.10) inset, 0px 14px 40px 0px #010816",
      }}
      className="fixed z-10 bottom-7 right-7 lg:static text-sm px-3 py-1 text-heading cardHeader"
    >
      Filter
    </button>
  );
};

export default ButtonFilter;
