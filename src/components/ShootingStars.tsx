const ShootingStars = () => {
  return (
    <div className="relative w-full">
      <section className="starsContainer">
        {Array.from({ length: 10 }).map((_, index) => (
          <span key={index} className="star"></span>
        ))}
      </section>
    </div>
  );
};

export default ShootingStars;
