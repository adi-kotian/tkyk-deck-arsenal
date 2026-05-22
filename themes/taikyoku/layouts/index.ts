// Barrel re-export so decks can:
//   import { Frame, Rail, Band, TwoUp, ... } from '../../themes/taikyoku/layouts';
// Layouts are theme infrastructure (imported); components remain transcribed
// into the deck (one-file rule). See COMPOSITION.md §1.
export { Frame }        from './Frame';
export { Structural }   from './Structural';
export { Rail }         from './Rail';
export { Band }         from './Band';
export { TwoUp }        from './TwoUp';
export { AnchoredRail } from './AnchoredRail';
export { DenseGrid }    from './DenseGrid';
export { Cards }        from './Cards';
export { Stat }         from './Stat';
export { Insight }      from './Insight';
export { LList }        from './LList';
export { Annote }       from './Annote';
