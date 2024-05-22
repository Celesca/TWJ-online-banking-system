export interface Card {
    title: string;
    description: string;
    image: string;
    link: string;
}

export const Cards: Card[] = [
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
    }
  ];