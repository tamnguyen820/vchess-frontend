const boardThemes = [
  { name: "Blue", value: "blue.svg" },
  { name: "Blue 2", value: "blue2.jpg" },
  { name: "Blue 3", value: "blue3.jpg" },
  { name: "Blue Marble", value: "blue-marble.jpg" },
  { name: "Brown", value: "brown.svg" },
  { name: "Canvas 2", value: "canvas2.jpg" },
  { name: "Danya Blue", value: "danyablue.svg" },
  { name: "Green", value: "green.svg" },
  { name: "Green Plastic", value: "green-plastic.png" },
  { name: "Grey", value: "grey.jpg" },
  { name: "Horsey", value: "horsey.jpg" },
  { name: "Ic", value: "ic.svg" },
  { name: "Leather", value: "leather.jpg" },
  { name: "Maple", value: "maple.jpg" },
  { name: "Maple 2", value: "maple2.jpg" },
  { name: "Marble", value: "marble.jpg" },
  { name: "Metal", value: "metal.jpg" },
  { name: "NCF", value: "ncf-board.png" },
  { name: "Neogreen", value: "neogreen.svg" },
  { name: "Newspaper", value: "newspaper.png" },
  { name: "Olive", value: "olive.jpg" },
  { name: "Pink Pyramid", value: "pink-pyramid.png" },
  { name: "Purple", value: "purple.svg" },
  { name: "Purple Diag", value: "purple-diag.png" },
  { name: "Wood", value: "wood.jpg" },
  { name: "Wood 2", value: "wood2.jpg" },
  { name: "Wood 3", value: "wood3.jpg" },
  { name: "Wood 4", value: "wood4.jpg" },
].sort((a, b) => a.name - b.name);

const pieceSets = [
  "alpha",
  "anarcandy",
  "caliente",
  "california",
  "cardinal",
  "cburnett",
  "celtic",
  "chess7",
  "chessnut",
  "companion",
  "disguised",
  "dubrovny",
  "fantasy",
  "fresca",
  "gioco",
  "governor",
  "horsey",
  "icpieces",
  "kiwen-suwi",
  "kosal",
  "leipzig",
  "letter",
  "libra",
  "maestro",
  "merida",
  "meridaclean",
  "mono",
  "mpchess",
  "neo",
  "pirouetti",
  "pixel",
  "reillycraig",
  "riohacha",
  "shapes",
  "spatial",
  "staunty",
  "tatiana",
].sort((a, b) => a - b);

export { boardThemes, pieceSets };