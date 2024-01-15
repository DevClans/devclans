const mongoose = require("mongoose");
const skills = [
  "HTML",
  "CSS",
  "JavaScript",
  "Python",
  "Java",
  "C",
  "C++",
  "C#",
  "PHP",
  "SQL",
  "Ruby",
  "Rust",
  "Go",
  "Swift",
  "Kotlin",
  "TypeScript",
  "Assembly",
  "Perl",
  "Scala",
  "R",
  "VBA",
  "Objective-C",
  "Lua",
  "Dart",
  "Haskell",
  "Julia",
  "MATLAB",
  "PowerShell",
  "Groovy",
  "Visual Basic",
  "Delphi",
  "RPG",
  "COBOL",
  "Ada",
  "Fortran",
  "Scratch",
  "Bash",
  "Lisp",
  "LabVIEW",
  "Transact-SQL",
  "PL/SQL",
  "Apex",
  "D",
  "Scheme",
  "Prolog",
  "ABAP",
  "F#",
  "Logo",
  "Alice",
  "COBOL",
  "Erlang",
  "OpenEdge ABL",
  "ML",
  "Racket",
  "Smalltalk",
  "Tcl",
  "Verilog",
  "Awk",
  "AutoLISP",
  "AutoIt",
  "Elixir",
  "Forth",
  "Hack",
  "J",
  "Julia",
  "LiveScript",
  "MQL4",
  "MQL5",
  "Nim",
  "Pascal",
  "PostScript",
  "Rexx",
  "Ring",
  "RPG",
  "Rust",
  "SAS",
  "SPSS",
  "Standard ML",
  "Turing",
  "VBScript",
  "VHDL",
  "Z shell",
  "Crystal",
  "Dylan",
  "Eiffel",
  "Elm",
  "Fantom",
  "Forth",
  "IDL",
  "Io",
  "Korn shell",
  "Maple",
  "Mathematica",
  "Objective-C",
  "OCaml",
  "Oz",
  "Pike",
  "Processing",
  "Pure Data",
  "Q",
  "REALbasic",
  "S",
  "Sather",
  "Seed7",
  "Self",
  "Simula",
  "Smalltalk",
  "Standard ML",
  "SuperCollider",
  "Tcl",
  "Vala",
  "Verilog",
  "VHDL",
  "XQuery",
  "Z shell",
];

const userSchema = new mongoose.Schema(
  {
    discordId: { type: String, required: true },
    githubId: { type: String, required: true },
    username: { type: String },
    avatar: { type: String },
    bio: { type: String }, // describe yourself to cohort folks
    phone: {
      type: String,
      validate: {
        validator: function (value) {
          return /^[0-9]{10}$/.test(value);
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
      required: function () {
        return this.contactMethod === "whatsapp";
      },
    },
    email: {
      type: String,
      validate: {
        validator: function (value) {
          return /\S+@\S+\.\S+/.test(value);
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
      required: function () {
        return this.contactMethod === "email";
      },
    },
    contactMethod: {
      type: String,
      enum: ["discord", "email", "whatsapp", "telegram", "twitter"],
      default: "discord",
    },
    socials: {
      twitter: {
        type: String,
        required: function () {
          return this.contactMethod === "twitter";
        },
        default: "",
      },
      telegram: {
        type: String,
        required: function () {
          return this.contactMethod === "telegram";
        },
        default: "",
      },
      linkedin: { type: String, default: "" },
      website: { type: String, default: "" },
    },
    skills: [
      {
        type: String,
        enum: skills, // Assuming skills is defined somewhere
      },
    ],
    ownedProjects: [
      { type: mongoose.Types.ObjectId, ref: "Project", default: [] },
    ],
    contributedProjects: [
      { type: mongoose.Types.ObjectId, ref: "Project", default: [] },
    ],
  },
  { timestamps: true }
);

const likeSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    project: { type: mongoose.Types.ObjectId, ref: "Project", required: true },
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const bookmarkSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    project: { type: mongoose.Types.ObjectId, ref: "Project", required: true },
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    desc: { type: String, required: true },
    owner: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    contributors: [{ type: mongoose.Types.ObjectId, ref: "User", default: [] }],
    topics: [{ type: String, default: [] }], // ml, android
    techStack: [{ type: String, default: [] }], // tech: html, css
    githubLink: { type: String, default: "" },
    likesCount: { type: Number, default: 0 },
    bookmarkCount: { type: Number, default: 0 },
    projectLinks: [{ type: String, default: [] }],
    projectDetails: {
      problem: { type: String, required: true },
      challenges: [
        {
          title: { type: String, default: "" },
          desc: { type: String, default: "" },
          solution: { type: String, default: "" },
          default: [],
        },
      ],
      futureGoals: [
        {
          title: { type: String, default: "" },
          desc: { type: String, default: "" },
          needHelp: { type: Boolean, default: false },
          default: [],
        },
      ],
      memberReq: [
        {
          title: { type: String, default: "" },
          desc: { type: String, default: "" },
        },
      ],
    },
    team: [{ type: mongoose.Types.ObjectId, ref: "User", default: [] }],
    needMembers: {
      type: String,
      enum: ["professional", "student", "beginner", null],
      default: null,
    },
    imgs: [{ type: String, default: [] }],
    video: { type: String, default: "" },
    devStage: {
      type: String,
      enum: ["idea", "development", "alpha", "beta", "production"],
      default: "idea",
    },
    published: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", userSchema);
const ProjectModel = mongoose.model("Project", projectSchema);
const LikeModel = mongoose.model("Like", likeSchema);
const BookmarkModel = mongoose.model("Bookmark", bookmarkSchema);

module.exports = { UserModel, ProjectModel, LikeModel, BookmarkModel };
