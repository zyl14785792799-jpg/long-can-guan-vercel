// 龙餐馆 28 道菜
// 分类：热菜 17 / 素菜 6 / 主食 4 / 汤 1
// 无价格，顾客扫码点餐用

export const DISHES = [
  // 热菜
  { id: 1, name: '青椒牛肉', category: '热菜', desc: '鲜嫩牛肉配爽脆青椒，镬气十足', image: '/dishes/dish-01.jpg' },
  { id: 2, name: '香菜牛肉', category: '热菜', desc: '牛肉香嫩，香菜提味', image: '/dishes/dish-02.jpg' },
  { id: 3, name: '双椒鸡胸肉', category: '热菜', desc: '双椒爆炒，鲜辣开胃', image: '/dishes/dish-03.jpg' },
  { id: 4, name: '番茄炒蛋', category: '热菜', desc: '酸甜番茄，嫩滑鸡蛋', image: '/dishes/dish-04.jpg' },
  { id: 5, name: '豆腐抱蛋', category: '热菜', desc: '豆腐嫩滑，鸡蛋金黄', image: '/dishes/dish-05.jpg' },
  { id: 6, name: '青椒炒鸡蛋', category: '热菜', desc: '青椒爽脆，鸡蛋鲜香', image: '/dishes/dish-06.jpg' },
  { id: 7, name: '青椒酿虾滑', category: '热菜', desc: '青椒酿入鲜虾滑，Q弹鲜美', image: '/dishes/dish-07.jpg' },
  { id: 8, name: '麻婆豆腐', category: '热菜', desc: '麻辣鲜香，豆腐嫩滑', image: '/dishes/dish-08.jpg' },
  { id: 9, name: '烧椒牛肉豆花', category: '热菜', desc: '烧椒香辣，牛肉配豆花', image: '/dishes/dish-09.jpg' },
  { id: 10, name: '秘制烤肠', category: '热菜', desc: '外焦里嫩，秘制风味', image: '/dishes/dish-10.jpg' },
  { id: 11, name: '咖喱鸡', category: '热菜', desc: '咖喱浓郁，鸡肉软嫩', image: '/dishes/dish-11.jpg' },
  { id: 12, name: '大盘鸡', category: '热菜', desc: '新疆风味，大盘实在', image: '/dishes/dish-12.jpg' },
  { id: 13, name: '藤椒鱼片', category: '热菜', desc: '藤椒清香，鱼片滑嫩', image: '/dishes/dish-13.jpg' },
  { id: 14, name: '清炖牛肋条', category: '热菜', desc: '清炖原味，牛肋软烂', image: '/dishes/dish-14.jpg' },
  { id: 15, name: '芥末黄油罗氏虾', category: '热菜', desc: '芥末微呛，黄油香浓，大虾鲜甜', image: '/dishes/dish-15.jpg' },
  { id: 16, name: '辣皮子牛肋排', category: '热菜', desc: '辣皮子香辣，牛肋排酥香', image: '/dishes/dish-16.jpg' },
  { id: 28, name: '番茄鸡', category: '热菜', desc: '番茄酸辣，鸡肉软嫩，汤汁拌饭一绝', image: '/dishes/dish-28.jpg' },
  // 素菜
  { id: 17, name: '虎皮青椒', category: '素菜', desc: '虎皮焦香，青椒爽脆', image: '/dishes/dish-17.jpg' },
  { id: 18, name: '贵州水煮菜', category: '素菜', desc: '贵州风味，清爽水煮', image: '/dishes/dish-18.jpg' },
  { id: 19, name: '清炒时蔬', category: '素菜', desc: '当季时蔬，清炒鲜嫩', image: '/dishes/dish-19.jpg' },
  { id: 20, name: '葱烧豆腐', category: '素菜', desc: '葱香浓郁，豆腐入味', image: '/dishes/dish-20.jpg' },
  { id: 21, name: '小炒西兰花', category: '素菜', desc: '西兰花脆嫩，清爽小炒', image: '/dishes/dish-21.jpg' },
  { id: 22, name: '蒜泥上海青', category: '素菜', desc: '蒜泥香浓，上海青鲜嫩', image: '/dishes/dish-22.jpg' },
  // 主食
  { id: 23, name: '蛋炒饭', category: '主食', desc: '金黄蛋炒饭，粒粒分明', image: '/dishes/dish-23.jpg' },
  { id: 24, name: '牛肉炒饭', category: '主食', desc: '牛肉香浓，米饭镬气足', image: '/dishes/dish-24.jpg' },
  { id: 25, name: '爆炒火鸡面', category: '主食', desc: '火鸡面香辣过瘾', image: '/dishes/dish-25.jpg' },
  { id: 26, name: '手抓饼', category: '主食', desc: '外酥里软，层层香脆', image: '/dishes/dish-26.jpg' },
  // 汤
  { id: 27, name: '老母鸡鸡汤', category: '汤', desc: '老母鸡慢炖，汤鲜味美', image: '/dishes/dish-27.jpg' },
]

export const CATEGORIES = ['热菜', '素菜', '主食', '汤']

export function getDish(id) {
  return DISHES.find(d => d.id === id)
}
