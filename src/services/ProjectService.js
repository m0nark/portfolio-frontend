const fetchProjects = async () => {
    try {
        const res = await fetch('https://api.aaditjain.in/api/v1/projects/view/details');
        const data = await res.json();

        if (data.status === 'SUCCESS') {
            return data.responseObject.map(repo => ({
                ...repo
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
