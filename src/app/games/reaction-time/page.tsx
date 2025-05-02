import { ReactionTimeScreen } from './reaction-time-screen';

interface Props {
    className?: string;
}

const ReactionTimePage = ({ className }: Props) => {
  return (
    <div className={className}>
        <ReactionTimeScreen />
    </div>
  );
};

export default ReactionTimePage;