
export const getStatus = (status) => {
    switch (status) {
        case 1:
            return { id: 1, label: "To Do", class: "bg-primary" };
        case 2:
            return { id: 2, label: "In Progress", class: "bg-warning text-dark" };
        case 3:
            return { id: 3, label: "Done", class: "bg-success" };
        case 4:
            return { id: 4, label: "Accept", class: "bg-secondary" };
        case 5:
            return { id: 5, label: "Reject", class: "bg-danger" };
        default:
            return { id: 0, label: "Unknown", class: "bg-light text-dark" };
    }
};