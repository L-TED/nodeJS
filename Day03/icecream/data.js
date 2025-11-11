const icecream = [
  {
    name: "마법사의 레시피",
    kcal: 250,
    flavor: ["mint", "chocolate"],
  },
  {
    name: "레인보우 샤베트",
    kcal: 220,
    flavor: ["fruit", "sherbet"],
  },
  {
    name: "엄마는 외계인",
    kcal: 300,
    flavor: ["chocolate", "cookie"],
  },
  {
    name: "사랑에 빠진 딸기",
    kcal: 270,
    flavor: ["strawberry", "cheese", "chocolate"],
  },
];

// /
// /menu : 아이스크림 리스트
// /menu?underKcal=300 : 300 칼로리보다 낮은
// /menu/1 : 레인보우샤베트 오브젝트

module.exports = { icecream };
