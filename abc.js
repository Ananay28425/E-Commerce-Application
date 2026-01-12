// Step 1: Click the image - returns a promise that resolves after 1 second
function step1(){
    return new Promise((resolve) => {
        console.log("Clicking the image");
        setTimeout(() => resolve(), 1000);
    });
}

// Step 2: Fill the form - returns a promise that resolves after 1 second
function step2(){
    return new Promise((resolve) => {
        console.log("Filling the form");
        setTimeout(() => resolve(), 1000);
    });
}   

// Step 3: Submit the form - returns a promise that resolves after 1 second
function step3(){
    return new Promise((resolve) => {
        console.log("Submitting the form");
        setTimeout(() => resolve(), 1000);
    });
}

// Promise chain: Execute steps sequentially
step1()                    // Start with step 1
    .then(() => step2())    // When step 1 completes, execute step 2
    .then(() => step3())    // When step 2 completes, execute step 3
    .then(() => console.log("All steps completed"))  // Final success message
    .catch((error) => console.error("Error:", error));  // Handle any errors