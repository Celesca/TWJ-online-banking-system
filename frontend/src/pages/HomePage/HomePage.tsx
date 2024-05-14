interface Card {
  title: string;
  description: string;
  image: string;
  link: string;
}

import './HomePage.css';

const HomePage = () => {
  const cards: Card[] = [
    {
      title: "Deposit",
      description: "ฝากเงินเข้าสู่บัญชีธนาคาร",
      image: "deposit.jpg",
      link: "/deposit",
    },
    {
      title: "Transfer Money",
      description: "โอนเงินได้ทุกธนาคาร",
      image: "transfer.jpg",
      link: "/transfer",
    },
    {
      title: "Loaning",
      description: "กู้สินเชื่อ",
      image: "loan.jpg",
      link: "/loan",
    },
  ];

  return (
    <div className="bg-gradient-to-r from-indigo-500 homepage_container p-16">
      <header className="text-white text-4xl pl-4 mb-8">
        What do you want to do today?
      </header>
      <div className="flex flex-wrap">
        {cards.map((card, index) => (
          <div key={index} className="w-1/4 p-4 card-content">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <img src={card.image} alt={card.title} className="w- mb-4" />
              <h3 className="text-lg text-center font-semibold">{card.title}</h3>
              <p className="text-gray-500 text-center pt-2">{card.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
