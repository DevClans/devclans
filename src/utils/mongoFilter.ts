export const mongoFilter = (
  search: string,
  filters: Record<string, any>,
  type: "projects" | "users"
) => {
  const isProject = type == "projects";
  const andConditions = [];
  // Add search conditions
  if (search) {
    if (isProject) {
      andConditions.push({
        $or: [
          { title: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
        ],
      });
    } else {
      andConditions.push({
        $or: [
          { username: { $regex: search, $options: "i" } },
          { bio: { $regex: search, $options: "i" } },
          {
            "githubDetails.username": {
              $exists: true,
              $regex: search,
              $options: "i",
            },
          },
          {
            "githubDetails.readme": {
              $exists: true,
              $regex: search,
              $options: "i",
            },
          },
        ],
      });
    }
  }

  // Add filter conditions
  if (Array.isArray(filters)) {
    for (const filter of filters) {
      andConditions.push({ [filter[0]]: filter[1] });
    }
  } else {
    for (const field in filters) {
      andConditions.push({ [field]: filters[field] });
    }
  }

  return {
    $and: andConditions,
  };
};
