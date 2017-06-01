# lowest-cost-kata
Lowest Cost Across An NxM Matrix

Rules as I interpreted them:

* Move only left to right across the matrix
* Wrap around top/bottom and visa versa
* Move as far as possible till the right is reached OR until 50 points have been reached (but not exceeded)

The code returns the best possible path if one exists. Will always return one path. Does not handle if all values in first row exceed the maximum.

## Getting Started

To run the code simply:

    npm install
    npm test

Then open a browser such as chrome and navigate to the karma URL. You can also install and use PhantomJS for a headless run but I didn't go to the work of setting that up. Enjoy!

## Side Notes

All code is test driven so there is no console logging or "bootstrap" application. If you want to see this running you can load the code in your console and run `subject.solveMatrix(matrix)` on whatever matrix you want to see solved. Happy Solving!