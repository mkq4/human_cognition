'use client'
import { GameScreen } from '@/components/shared/game-screen';
import { Button } from '@/components/ui/button';
import { VisualMemoryContext, VisualMemoryProvider } from '@/contexts/visualMemory.context';
import { Eye } from 'lucide-react';
import { useContext } from 'react';

interface Props {
    className?: string;
}


const VisualMemoryPage = ({ className }: Props) => {
    
  return (
    <VisualMemoryProvider>
      <GameScreens/>
    </VisualMemoryProvider>
  );
};

const GameScreens = () => {
    const {screen} = useContext(VisualMemoryContext)
    console.log(screen)
    return (
        <div>
            {(() => {
                switch (screen) {
                    case 'start':
                        return <StartScreen />
                    case 'game':
                        return <MainScreen />;
                    case 'end':
                        return <EndScreen />;
                    default:
                        return null
                }
            })()}
        </div>
    )
}

const StartScreen = () => {
    const {setScreen} = useContext(VisualMemoryContext)
    return (
      <GameScreen>
        <Eye size={150} />
        <p className="text-3xl">Visual memory game</p>
        <Button onClick={() => setScreen('game')}>Start</Button>
      </GameScreen>
    );
}

const MainScreen = () => {

	

  return (
    <GameScreen>
      {/* // generating area */}
			<Area />
    </GameScreen>
  );
};

const Area = () => {
	console.log('area')
	const { blocksAmount } = useContext(VisualMemoryContext); // количество блоков
	console.log(blocksAmount)
	const blockSide = Math.floor(500 / blocksAmount - 20) // ширина блока
	return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${blocksAmount}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${blocksAmount}, minmax(0, 1fr))`,
      }}
      className="grid grid-cols-3 gap-3"
    >
      {Array.from({ length: blocksAmount ** 2 }).map((_, i) => {
        return (
          <div
            style={{ width: blockSide, height: blockSide }}
            className={`border-2`}
          >
            {i}
          </div>
        );
      })}
    </div>
  );
}

const EndScreen = () => {
    return <GameScreen>EndScreen</GameScreen>;
}


export default VisualMemoryPage