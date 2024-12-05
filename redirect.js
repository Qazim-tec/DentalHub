document.addEventListener("DOMContentLoaded", () => {
    const isMobile = window.innerWidth <= 768;

    // Check current page
    const isSignInMobilePage = window.location.pathname.includes("SignInMobile.html");
    const isSignUpMobilePage = window.location.pathname.includes("SignupMobile.html");

    // Redirect logic
    if (isMobile) {
        if (!isSignInMobilePage && !isSignUpMobilePage) {
            // Redirect to mobile Sign-In view as default
            window.location.href = "SignInMobile.html";
        }
    } else {
        if (isSignInMobilePage || isSignUpMobilePage) {
            // Redirect to desktop Sign-Up page as default
            window.location.href = "Sign-up.html";
        }
    }
});

