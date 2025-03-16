import { useDoc } from "./firebase";

export const useMaster = () => {
  const { state: master } = useDoc<Master>("master");
  const nameByID =
    master === null ? null : (
      new Map(master.players.map(({ id, name }) => [id, name]))
    );
  return {
    nameByID,
  };
};

type Master = {
  players: Player[];
  rules: Rule[];
};

type Player = {
  id: number;
  name: string;
};

type Rule = never;
