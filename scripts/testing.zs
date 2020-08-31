print("Hello World!");

val iron = <minecraft:iron_ingot>;
val leggings = <minecraft:iron_leggings>;

recipes.addShaped("TestingLeggings", leggings,
[
  [iron, iron, iron],
  [null, null, null],
  [null, null, null]
]);