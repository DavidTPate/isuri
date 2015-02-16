(function(module) {

    /**
     * Basic Values (http://tools.ietf.org/html/rfc3986#page-11)
     *
     * This specification uses the Augmented Backus-Naur Form (ABNF)
     * notation of [RFC2234], including the following core ABNF syntax rules
     * defined by that specification: ALPHA (letters), CR (carriage return),
     * DIGIT (decimal digits), DQUOTE (double quote), HEXDIG (hexadecimal
     * digits), LF (line feed), and SP (space).  The complete URI syntax is
     * collected in Appendix A.
     *
     * @type {string}
     */

    /**
     * Digit (http://tools.ietf.org/html/rfc2234#page-10)
     *
     * DIGIT =  %x30-39 ; 0-9
     *
     * @type {string}
     */
    var digit = '0-9',
        digitOnly = '[' + digit + ']';

    /**
     * Alpha (http://tools.ietf.org/html/rfc2234#page-11)
     *
     * ALPHA =  %x41-5A / %x61-7A   ; A-Z / a-z
     *
     * @type {string}
     */
    var alpha = 'a-zA-Z';

    /**
     * Hexadecimal Digit (http://tools.ietf.org/html/rfc2234#page-11)
     *
     * HEXDIG =  DIGIT / "A" / "B" / "C" / "D" / "E" / "F"
     *
     * @type {string}
     */
    var hexDigit = digit + 'A-F',
        hexDigitOnly = '[' + hexDigit + ']';

    /**
     * Unreserved (http://tools.ietf.org/html/rfc3986#page-13)
     *
     * Characters that are allowed in a URI but do not have a reserved
     * purpose are called unreserved.  These include uppercase and lowercase
     * letters, decimal digits, hyphen, period, underscore, and tilde.
     *
     * unreserved  = ALPHA / DIGIT / "-" / "." / "_" / "~"
     *
     * @type {string}
     */
    var unreserved = alpha + digit + '-\\._~';

    /**
     * Percent Encoded (http://tools.ietf.org/html/rfc3986#page-12)
     *
     *  percent-encoding mechanism is used to represent a data octet in a
     * component when that octet's corresponding character is outside the
     * allowed set or is being used as a delimiter of, or within, the
     * component.  A percent-encoded octet is encoded as a character
     * triplet, consisting of the percent character "%" followed by the two
     * hexadecimal digits representing that octet's numeric value.  For
     * example, "%20" is the percent-encoding for the binary octet
     * "00100000" (ABNF: %x20), which in US-ASCII corresponds to the space
     * character (SP).
     *
     * pct-encoded = "%" HEXDIG HEXDIG
     *
     * @type {string}
     */
    var pctEncoded = '%' + hexDigit;

    /**
     * Sub Delimiters (http://tools.ietf.org/html/rfc3986#page-13)
     *
     *
     *
     * sub-delims = "!" / "$" / "&" / "'" / "(" / ")" / "*" / "+" / "," / ";" / "="
     *
     * @type {string}
     */
    var subDelims = '!$&\'()*+,;=';

    /**
     * PChar (http://tools.ietf.org/html/rfc3986#page-23)
     *
     * pchar = unreserved / pct-encoded / sub-delims / ":" / "@"
     *
     * @type {string}
     */
    var pchar = unreserved + pctEncoded + subDelims + ':@',
        pcharOnly = '[' + pchar + ']';

    /**
     * Alternative Rules (http://tools.ietf.org/html/rfc2234#page-6)
     *
     * ements separated by forward slash ("/") are alternatives.
     *
     * @type {string}
     */
    var or = '|';

    /**
     * Rule to support zero-padded addresses.
     *
     * @type {string}
     */
    var zeroPad = '0?';

    /**
     * dec-octect (http://tools.ietf.org/html/rfc3986#page-20)
     *
     * dec-octet   = DIGIT                 ; 0-9
     *            / %x31-39 DIGIT         ; 10-99
     *            / "1" 2DIGIT            ; 100-199
     *            / "2" %x30-34 DIGIT     ; 200-249
     *            / "25" %x30-35          ; 250-255
     *
     * @type {string}
     */
    var decOctect = '(' + zeroPad + zeroPad + digitOnly + or + zeroPad + '[1-9]' + digitOnly + or + '1' + digitOnly + digitOnly + or + '2' + '[0-4]' + digitOnly + or + '25' + '[0-5])';

    /**
     * Scheme (http://tools.ietf.org/html/rfc3986#page-17)
     *
     * Scheme names consist of a sequence of characters beginning with a
     * letter and followed by any combination of letters, digits, plus
     * ("+"), period ("."), or hyphen ("-").
     *
     * @type {string}
     */
    var scheme = '^[a-zA-Z][a-zA-Z0-9+\\.-]*:';

    /**
     * User Info (http://tools.ietf.org/html/rfc3986#page-18)
     *
     * The userinfo subcomponent may consist of a user name and, optionally,
     * scheme-specific information about how to gain authorization to access
     * the resource.  The user information, if present, is followed by a
     * commercial at-sign ("@") that delimits it from the host.
     *
     * userinfo    = *( unreserved / pct-encoded / sub-delims / ":" )
     *
     * @type {string}
     */
    var userinfo = '([' + unreserved + pctEncoded + subDelims + ':]*@)?';

    /**
     * IPv4address (http://tools.ietf.org/html/rfc3986#page-20)
     *
     * A host identified by an IPv4 literal address is represented in
     * dotted-decimal notation (a sequence of four decimal numbers in the
     * range 0 to 255, separated by "."), as described in [RFC1123] by
     * reference to [RFC0952].  Note that other forms of dotted notation may
     * be interpreted on some platforms, as described in Section 7.4, but
     * only the dotted-decimal form of four octets is allowed by this
     * grammar.
     *
     * IPv4address = dec-octet "." dec-octet "." dec-octet "." dec-octet
     *
     * @type {string}
     */
    var IPv4address = '(' + decOctect + '\\.){3}' + decOctect;

    /**
     * IPv6 Address (http://tools.ietf.org/html/rfc3986#page-20)
     *
     * A 128-bit IPv6 address is divided into eight 16-bit pieces.  Each
     * piece is represented numerically in case-insensitive hexadecimal,
     * using one to four hexadecimal digits (leading zeroes are permitted).
     * The eight encoded pieces are given most-significant first, separated
     * by colon characters.  Optionally, the least-significant two pieces
     * may instead be represented in IPv4 address textual format.  A
     * sequence of one or more consecutive zero-valued 16-bit pieces within
     * the address may be elided, omitting all their digits and leaving
     * exactly two consecutive colons in their place to mark the elision.
     *
     * IPv6address =                            6( h16 ":" ) ls32
     *             /                       "::" 5( h16 ":" ) ls32
     *             / [               h16 ] "::" 4( h16 ":" ) ls32
     *             / [ *1( h16 ":" ) h16 ] "::" 3( h16 ":" ) ls32
     *             / [ *2( h16 ":" ) h16 ] "::" 2( h16 ":" ) ls32
     *             / [ *3( h16 ":" ) h16 ] "::"    h16 ":"   ls32
     *             / [ *4( h16 ":" ) h16 ] "::"              ls32
     *             / [ *5( h16 ":" ) h16 ] "::"              h16
     *             / [ *6( h16 ":" ) h16 ] "::"
     *
     * ls32        = ( h16 ":" h16 ) / IPv4address ; least-significant 32 bits of address
     *
     * h16         = 1*4HEXDIG ; 16 bits of address represented in hexadecimal
     *
     * @type {string}
     */
    var h16 = '(' + hexDigitOnly + '){1,4}',
        ls32 = '(' + h16 + ':' + h16 + '|' + IPv4address + ')',
        IPv6SixHex = '(' + h16 + ':){6}' + ls32,
        IPv6FiveHex = '::(' + h16 + ':){5}' + ls32,
        IPv6FourHex = h16 + '::(' + h16 + ':){4}' + ls32,
        IPv6ThreeeHex = '(' + h16 + ':){0,1}' + h16 + '::(' + h16 + ':){3}' + ls32,
        IPv6TwoHex = '(' + h16 + ':){0,2}' + h16 + '::(' + h16 + ':){2}' + ls32,
        IPv6OneHex = '(' + h16 + ':){0,3}' + h16 + '::' + h16 + ':' + ls32,
        IPv6NoneHex = '(' + h16 + ':){0,4}' + h16 + '::' + ls32,
        IPv6NoneHex2 = '(' + h16 + ':){0,5}' + h16 + '::' + h16,
        IPv6NoneHex3 = '(' + h16 + ':){0,6}' + h16 + '::',
        IPv6address = '(' + IPv6SixHex + or + IPv6FiveHex + or + IPv6FourHex + or + IPv6ThreeeHex + or + IPv6TwoHex + or + IPv6OneHex + or + IPv6NoneHex + or + IPv6NoneHex2 + or + IPv6NoneHex3 + ')';

    /**
     * IP Future Versions (http://tools.ietf.org/html/rfc3986#page-19)
     *
     * IPvFuture  = "v" 1*HEXDIG "." 1*( unreserved / sub-delims / ":" )
     *
     * @type {string}
     */
    var IPvFuture = '(v' + hexDigitOnly +'+\\.[' + unreserved + subDelims + ':]+)';

    /**
     * IP Literal (http://tools.ietf.org/html/rfc3986#page-19)
     *
     * A host identified by an Internet Protocol literal address, version 6
     * [RFC3513] or later, is distinguished by enclosing the IP literal
     * within square brackets ("[" and "]").  This is the only place where
     * square bracket characters are allowed in the URI syntax.  In
     * anticipation of future, as-yet-undefined IP literal address formats,
     * an implementation may use an optional version flag to indicate such a
     * format explicitly rather than rely on heuristic determination.
     *
     * IP-literal = "[" ( IPv6address / IPvFuture  ) "]"
     *
     * @type {string}
     */
    var IPLiteral = '\\[(' + IPv6address + or + IPvFuture + ')\\]';

    /**
     * Registered Name (http://tools.ietf.org/html/rfc3986#page-21)
     *
     * A registered name consists of a sequence of domain labels separated
     * by ".", each domain label starting and ending with an alphanumeric
     * character and possibly also containing "-" characters. The rightmost
     * domain label of a fully qualified domain name in DNS may be followed
     * by a single "." and should be if it is necessary to distinguish between
     * the complete domain name and some local domain.
     *
     * reg-name    = *( unreserved / pct-encoded / sub-delims )
     *
     * @type {string}
     */
    var regName = '[' + unreserved + pctEncoded + subDelims + ']{0,255}';

    /**
     * Host (http://tools.ietf.org/html/rfc3986#page-18)
     *
     * The host subcomponent of authority is identified by an IP literal
     * encapsulated within square brackets, an IPv4 address in dotted-
     * decimal form, or a registered name.
     *
     * host        = IP-literal / IPv4address / reg-name
     *
     * @type {string}
     */
    var host = '(' + IPLiteral + or + IPv4address + or + regName + ')';

    /**
     * Port (http://tools.ietf.org/html/rfc3986#page-22)
     *
     * The port subcomponent of authority is designated by an optional port
     * number in decimal following the host and delimited from it by a
     * single colon (":") character.
     *
     * port        = *DIGIT
     *
     * URI producers and normalizers should omit the port component and its
     * ":" delimiter if port is empty or if its value would be the same as
     * that of the scheme's default.
     *
     * @type {string}
     */
    var port = '(:' + digitOnly + '*)?';

    /**
     * Authority (http://tools.ietf.org/html/rfc3986#page-17)
     *
     * The authority component is preceded by a double slash ("//") and is
     * terminated by the next slash ("/"), question mark ("?"), or number
     * sign ("#") character, or by the end of the URI.
     *
     * authority   = [ userinfo "@" ] host [ ":" port ]
     *
     * URI producers and normalizers should omit the ":" delimiter that
     * separates host from port if the port component is empty.  Some
     * schemes do not allow the userinfo and/or port subcomponents.
     *
     * If a URI contains an authority component, then the path component
     * must either be empty or begin with a slash ("/") character.
     *
     * @type {string}
     */
    var authority = '(([\\//]{2}[\\//]?)|(?=[^\/]))' + userinfo + host + port;

    /**
     * Path (http://tools.ietf.org/html/rfc3986#page-22)
     *
     * The path component contains data, usually organized in hierarchical
     * form, that, along with data in the non-hierarchical query component
     * (Section 3.4), serves to identify a resource within the scope of the
     * URI's scheme and naming authority (if any).  The path is terminated
     * by the first question mark ("?") or number sign ("#") character, or
     * by the end of the URI.

     * If a URI contains an authority component, then the path component
     * must either be empty or begin with a slash ("/") character.

     * path          = path-abempty    ; begins with "/" or is empty
     *               / path-absolute   ; begins with "/" but not "//"
     *               / path-noscheme   ; begins with a non-colon segment
     *               / path-rootless   ; begins with a segment
     *               / path-empty      ; zero characters

     * path-abempty  = *( "/" segment )
     * path-absolute = "/" [ segment-nz *( "/" segment ) ]
     * path-noscheme = segment-nz-nc *( "/" segment )
     * path-rootless = segment-nz *( "/" segment )
     * path-empty    = 0<pchar>
     *
     * segment       = *pchar
     * segment-nz    = 1*pchar
     * segment-nz-nc = 1*( unreserved / pct-encoded / sub-delims / "@" )
     * ; non-zero-length segment without any colon ":"
     *
     * @type {string}
     */
    var segment = pcharOnly + '*',
        segmentNz = pcharOnly + '+',
        segmentNzNc = '[' + unreserved + pctEncoded + subDelims + '@]+',
        pathAbEmpty = '(\\/' + segment + ')*',
        pathAbsolute = '\\/' + segmentNz + pathAbEmpty,
        pathNoScheme =segmentNzNc + pathAbEmpty,
        pathRootless = segmentNz + pathAbEmpty,
        path = '(\\/(' + pathAbEmpty + or + pathAbsolute + or + pathNoScheme + or + pathRootless + '))?';

    /**
     * Query (http://tools.ietf.org/html/rfc3986#page-23)
     *
     *  The query component contains non-hierarchical data that, along with
     * data in the path component (Section 3.3), serves to identify a
     * resource within the scope of the URI's scheme and naming authority
     * (if any).  The query component is indicated by the first question
     * mark ("?") character and terminated by a number sign ("#") character
     * or by the end of the URI.
     *
     * query = *( pchar / "/" / "?" )
     *
     * @type {string}
     */
    var query = '(\\?[' + pchar + '\\/\\?]*(?=#|$))?';

    /**
     * Fragment (http://tools.ietf.org/html/rfc3986#page-24)
     * The fragment identifier component of a URI allows indirect
     * identification of a secondary resource by reference to a primary
     * resource and additional identifying information.  The identified
     * secondary resource may be some portion or subset of the primary
     * resource, some view on representations of the primary resource, or
     * some other resource defined or described by those representations.  A
     * fragment identifier component is indicated by the presence of a
     * number sign ("#") character and terminated by the end of the URI.
     *
     * fragment = *( pchar / "/" / "?" )
     *
     * @type {string}
     */
    var fragment = '(#[' + pchar +'\\/\\?]*$)?';

    var uriRegex = new RegExp(scheme + authority + path + query + fragment);

    function testUri(str) {
        return uriRegex.test(str);
    }

    module.exports = {
        test: testUri,
        regex: uriRegex
    };
}(module));