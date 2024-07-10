import Part from './Part';

interface ContentProps {
  courseParts: {
    name: string;
    exerciseCount: number;
    description?: string;
    groupProjectCount?: number;
    backgroundMaterial?: string;
    requirements?: string[];
    kind: 'basic' | 'group' | 'background';
  }[];
}

const Contents = (props: ContentProps) => {
  return (
    <div>
      {props.courseParts.map((part) => (
        <Part part={part} />
      ))}
    </div>
  );
};

export default Contents;
