import binary from "binary";
import AbstractParser from "./abstract-parser";

export default class MarkerHeaderParser extends AbstractParser {
  constructor(buffer) {
    super(buffer);
  }
  _addSizeIfFlagIsSet(parsedVars) {
    if ((parsedVars.flags & 0x8000) !== 0) {
      let { vars: { addSize } } = this.word32lu("addSize");
      parsedVars.size += addSize || 0;
    }
  }
  parse() {
    let { vars: markerHeader } = binary.parse(this._buffer)
                                    .word16lu("crc")
                                    .word8lu("type")
                                    .word16lu("flags")
                                    .word16lu("size")
                                    .tap(this._addSizeIfFlagIsSet);
    return markerHeader;
  }
}
