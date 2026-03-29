function AboutHero() {
  return (
    <div className="min-h-screen min-w-screen mt-13 ">
      <div className="grid grid-cols-2 grid-rows-1 w-full">
        {/* left section  */}
        <div className=" flex justify-center items-center">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Accusantium nobis ex, deleniti aut quaerat rem, at explicabo qui et
            ipsum ea beatae accusamus veritatis nulla a consequatur aliquam!
            Nesciunt, laborum!
          </p>
        </div>
        {/* right section  */}
        <div className="flex justify-center items-center flex-col ">
          <img
            src="/images/mahadev1.jpg"
            alt="Mahadev"
            className="aspect-auto rounded-4xl"
            width="4096"
            height="4096"
          />
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Expedita
            accusantium at possimus harum ducimus, ad, ullam doloremque saepe
            quia velit quisquam? Inventore animi omnis autem, aliquid voluptas
            in odit officiis!
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutHero;
