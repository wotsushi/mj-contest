import { useDoc } from "../firebase";

export type Master = { players: Player[]; rules: Rule[] };

export type Player = { id: number; name: string };

type Rule = never;

export const useMaster = () => {
  const { state: master } = useDoc<Master>("master");
  const nameByID =
    master === null ? null : (
      new Map(master.players.map(({ id, name }) => [id, name]))
    );
  return { nameByID };
};
