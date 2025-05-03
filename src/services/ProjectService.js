
const fetchProjects = async () => {
    try {
        const res = await fetch('https://api.aaditjain.in/api/v1/projects/view/details');  // Assuming your backend returns the projects here
        const data = await res.json();

        if (data.status === 'SUCCESS') {
            return data.responseObject.map(repo => ({
                ...repo,
                imageUrl: repo.imageUrl === "default_image_url" 
                    ? "/images/default_no_repo_image.jpg"  // Use the local default image if URL is not provided
                    : repo.imageUrl,
            }));
        } else {
            console.error('Failed to fetch projects:', data.message);
            return [];
        }
    } catch (err) {
        console.error("Error fetching projects:", err);
        return [];
    }
};

export { fetchProjects };