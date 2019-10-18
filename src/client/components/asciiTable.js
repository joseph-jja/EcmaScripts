import {
    convertFromBaseTenToBaseX
} from 'utils/mathFunctions';

const NONE_PRINT_CHARACTERS = [ "NUL (null)", "SOH (start of heading)", "STX (start of text)",
    "ETX (end of text)", "EOT (end of transmission)",
    "ENQ (enquiry)", "ACK (acknowledge)", "BEL (bel)",
    "BS (backspace)", "TAB (horizontal tab)",
    "LF (NL line feed, new line)", "VT (verticle tab)",
    "FF (NP form feed, new page)", "CR (carriage return)", "SO (shift out)",
    "SI (shift in)", "DLE (data link exchange)", "DC1 (device control 1)",
    "DC2 (device control 2)", "DC3 (device control 3)", "DC4 (device control 4)",
    "NAK (negitive acknowledge)", "SYN (synchronous idle)",
    "ETB (end of trans. block)", "CAN (cancel)", "EM (end of medium)",
    "SUB (substitute)", "ESC (escape)", "FS (file separator)", "GS (group separator)",
    "RS (record separator)", "US (unit separator)", "SPACE"
];

// printable characters
for ( let i = 33; i < 127; i++ ) {
    NONE_PRINT_CHARACTERS[ i ] = `${String.fromCharCode(i)}`;
}

let max = 0;

for ( let i = 0, end = NONE_PRINT_CHARACTERS.length; i < end; i++ ) {
    const l = NONE_PRINT_CHARACTERS[ i ].length;
    max = ( max > l ? max : l );
}

const results = [];

for ( let i = 0, end = NONE_PRINT_CHARACTERS.length; i < end; i++ ) {

    let row = {
        'decimal': i.toString().padStart( 4, ' ' ).padEnd( 8, ' ' ),
        'character': NONE_PRINT_CHARACTERS[ i ].padStart( max, ' ' ),
        'hex': convertFromBaseTenToBaseX( 16, i ).padStart( 10, ' ' ),
        'octal': convertFromBaseTenToBaseX( 8, i ).padStart( 10, ' ' ),
        'binary': convertFromBaseTenToBaseX( 2, i ).padStart( 8, '0' )
    };
    results.push( row );

    let line = `${row.decimal} ${row.character} ${row.hex} ${row.octal} ${row.binary} `;
    console.log( line );
}

export {
    results
};
