const isAuthenticated = async (): Promise<boolean> => {
    const token = {
        token: localStorage.getItem("auth-token")
    };

    try {
        const response = await fetch("/validate-token", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(token),
        });

        if (response.ok) {
            return true;
        } else {
            console.error('Failed to validate token:', response.status);
            // Handle non-2xx responses, you might want to return false or handle it differently
            return false;
        }
    } catch (error) {
        console.error('Error validating token:', error);
        // Handle fetch errors, return false or handle it differently
        return false;
    }
};

export default isAuthenticated;