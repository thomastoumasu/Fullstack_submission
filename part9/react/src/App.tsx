/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

interface HeaderProps {
  name: string;
}

const Header = (props: HeaderProps) => <h1>{props.name}</h1>;

interface TotalProps {
  total: number;
}

const Total = (props: TotalProps) => <p> Number of exercises {props.total} </p>;

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDescriptive extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartDescriptive {
  kind: "basic";
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

interface CoursePartBackground extends CoursePartDescriptive {
  backgroundMaterial: string;
  kind: "background";
}

interface CoursePartSpecial extends CoursePartDescriptive {
  requirements: string[];
  kind: "special";
}

type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartSpecial;

interface PartProps {
  part: CoursePart;
}

const Part = (props: PartProps) => {
  switch (props.part.kind) {
      case "basic":
        return (
          <p>
            <strong>
              {props.part.name} {props.part.exerciseCount}
            </strong>
            <div><i>{props.part.description} </i></div>
          </p>
        );
      case "background":
        return (
          <p>
            <strong>
              {props.part.name} {props.part.exerciseCount}
            </strong>
            <div><i> {props.part.description} </i></div>
            <div> please read {props.part.backgroundMaterial}</div>
          </p>
        );
      case "group":
        return (
          <p>
            <strong>
              {props.part.name} {props.part.exerciseCount}
            </strong>
            <div> project exercises: {props.part.exerciseCount}</div>
          </p>
        );
      case "special":
        return (
          <p>
            <strong>
              {props.part.name} {props.part.exerciseCount}
            </strong>
            <div><i> {props.part.description} </i></div>
            <div> required skills: {props.part.requirements.join(", ")}</div>
          </p>
        );
      default:
        assertNever(props.part);
    }
};

interface ContentProps {
  parts: CoursePart[];
}

const Content = (props: ContentProps) => {
  return props.parts.map((part) => <Part part={part} />);
};

const App = () => {
  const courseName = "Half Stack application development";

  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic",
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group",
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic",
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial:
        "https://type-level-typescript.com/template-literal-types",
      kind: "background",
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special",
    },
  ];

  const totalExercises = courseParts.reduce(
    (sum, part) => sum + part.exerciseCount,
    0
  );

  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total total={totalExercises} />
    </div>
  );
};

export default App;
