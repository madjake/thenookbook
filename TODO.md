# TODO

1. Sanitize and validate query params. Bounds checking, etc
1. Support Pagination/Infinite Scroll
1. Rework the way data is loaded, categorized, tagged, etc for easier indexing and traversal. 
1. Handle different object types
  1. Right now the data loading is naive and really just looks to see if an object has an Image property
  1. Aggregate certain object values as a list of tags that can be searched?
1. Add tests/validation to XLSX data file in prepration of being able to pull in an updated version with more than 0 confidence that it doesn't blow up
1. More intelligent search fields/values
1. Item cards that display attributes (buy, sell, category, and any other meta data around said item);
1. Footer with attribution for data/legalese CYA 
