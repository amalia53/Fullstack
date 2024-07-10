interface PartProps {
  part: {
    name: string;
    exerciseCount: number;
    description?: string;
    groupProjectCount?: number;
    backgroundMaterial?: string;
    requirements?: string[];
    kind: 'basic' | 'group' | 'background' | 'special';
  };
}

const Part = (props: PartProps) => {
  switch (props.part.kind) {
    case 'basic':
      return (
        <div>
          <p>
            <b>
              {props.part.name} {props.part.exerciseCount}
            </b>
            <br />
            <i>{props.part.description}</i>
          </p>
        </div>
      );
    case 'group':
      return (
        <div>
          <p>
            <b>
              {props.part.name} {props.part.exerciseCount}
            </b>
            <br />
            Project exercises: {props.part.groupProjectCount}
          </p>
        </div>
      );
    case 'background':
      return (
        <div>
          <p>
            <b>
              {props.part.name} {props.part.exerciseCount}
            </b>
            <br />
            <i>{props.part.description}</i>
            <br />
            {props.part.backgroundMaterial}
          </p>
        </div>
      );
    case 'special':
      return (
        <div>
          <p>
            <b>
              {props.part.name} {props.part.exerciseCount}
            </b>
            <br />
            <i>{props.part.description}</i>
            <br />
            required skills: {props.part.requirements?.map((r) => r + ', ')}
          </p>
        </div>
      );
    default:
      return (
        <p>
          <b>
            {props.part.name} {props.part.exerciseCount}
          </b>
        </p>
      );
  }
};

export default Part;
