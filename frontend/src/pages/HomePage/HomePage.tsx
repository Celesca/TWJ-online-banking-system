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
      title: "Transfer",
      description: "โอนเงินได้ทุกที่ที่เวลา",
      image: "transfer.jpg",
      link: "/transfer",
    },
    {
      title: "Loaning",
      description: "ทำการกู้สินเชื่อกับธนาคาร",
      image: "loan.jpg",
      link: "/loan",
    },
    {
      title: "Loaning",
      description: "กู้สินเชื่อ",
      image: "loan.jpg",
      link: "/loan",
    },
  ];

  return (
    <div className="flex bg-gradient-to-r from-indigo-500 homepage_container p-16">
    <div className="w-1/2 p-4">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-lg text-center font-semibold">Balance</h2>
        <div className="flex justify-center">
          <div className="text-4xl font-semibold text-center pt-4">฿ 1,000,000</div>
        </div>
      </div>
    </div>
    <div className="w-1/2 p-4">
      <header className="text-greetings text-4xl p-2 mb-8">
        What do you <span>want to do today?</span>
      </header>
      <div className="flex flex-wrap justify-center">
  {cards.map((card, index) => (
    <div key={index} className="w-1/2 min-w-0 sm:min-w-1/2 p-4 card-content">
      <div className="bg-white rounded-lg shadow-lg pl-4 py-4 pr-0 flex">
        <div className="flex">
          <img src={card.image} alt={card.title} className="w-32 h-32"/>
        </div>
        <div className="py-4">
  <h3 className="text-lg text-center font-semibold">{card.title}</h3>
  <p className="text-gray-500 text-center pt-2">{card.description}</p>
</div>
      </div>
    </div>
  ))}
</div>
    </div>
  </div>
  );
};

export default HomePage;
