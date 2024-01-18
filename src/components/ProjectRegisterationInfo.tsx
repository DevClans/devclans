"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { z, ZodError } from "zod";
import {
  FormControl,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
} from "@mui/material";

// Define the Zod schema for your form data
const projectSchema = z.object({
  title: z.string().min(4).max(100),
  desc: z.string().min(10).max(250),
  topics: z.array(z.string()),
  githubLink: z.string(),
  skills: z.array(z.string()).optional(),
  projectLinks: z.array(z.string()).optional(),
  projectDetails: z
    .object({
      problem: z.string(),
      challenges: z.array(
        z.object({ title: z.string(), desc: z.string(), solution: z.string() })
      ),
      futureGoals: z.array(
        z.object({ title: z.string(), desc: z.string(), needHelp: z.boolean() })
      ),
      memberReq: z.array(z.object({ title: z.string(), desc: z.string() })),
    })
    .optional(),
  team: z.array(z.string()).optional(),
  needMembers: z.enum(["professional", "student", "beginner"]).optional(),
  imgs: z.array(z.string()).optional(),
  video: z.string().optional(),
  devStage: z
    .enum(["idea", "development", "alpha", "beta", "production"])
    .optional(),
  published: z.boolean(),
});

const CreateProject = () => {
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    topics: [""],
    githubLink: "",
    techStack: [],
    projectLinks: [""],
    projectDetails: {
      problem: "",
      challenges: [{ title: "", desc: "", solution: "" }],
      futureGoals: [{ title: "", desc: "", needHelp: false }],
      memberReq: [{ title: "", desc: "" }],
    } as any,
    team: [],
    needMembers: "professional",
    imgs: [],
    video: "",
    devStage: "idea",
    published: false,
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    validateField(name, value);
  };

  const validateField = (name: any, value: any) => {
    try {
      projectSchema.pick(name.split(".")).parse(value);
      setFormErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    } catch (error: any) {
      if (error instanceof ZodError) {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          [name]: error.errors[0]?.message ?? "Invalid value",
        }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      projectSchema.parse(formData);
      // Add logic to send data to the backend
      const response = await fetch("/api/projects/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push("/projects"); // Redirect to the project page after successful creation
      } else {
        console.error("Error creating project");
      }
    } catch (error) {
      if (error instanceof ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          const path = err.path.join(".");
          newErrors[path] = err.message;
        });
        setFormErrors(newErrors);
      } else {
        console.error("Error validating form:", error);
      }
    }
  };

  return (
    <div>
      <h1>Create a Project</h1>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth>
          <InputLabel>Title</InputLabel>
          <TextField
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            error={Boolean(formErrors.title)}
            helperText={formErrors.title}
          />
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Description</InputLabel>
          <TextField
            type="text"
            name="desc"
            value={formData.desc}
            onChange={handleChange}
            error={Boolean(formErrors.desc)}
            helperText={formErrors.desc}
          />
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Topics (comma-separated)</InputLabel>
          <TextField
            type="text"
            name="topics"
            value={formData.topics}
            onChange={(e) => {
              setFormData((prevData: any) => ({
                ...prevData,
                topics: e.target.value.split(","),
              }));
              validateField("topics", e.target.value.split(","));
            }}
            error={Boolean(formErrors.topics)}
            helperText={formErrors.topics}
          />
        </FormControl>

        {/* Add similar components for other fields */}

        <button type="submit">Create Project</button>
      </form>
    </div>
  );
};

export default CreateProject;
