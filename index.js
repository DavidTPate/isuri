(function(module) {

    /**
     * ^ denotes the beginning of the string
     *
     * URI Scheme, See http://tools.ietf.org/html/rfc3986#page-16
     * scheme  = ALPHA *( ALPHA / DIGIT / "+" / "-" / "." )
     *
     * According to RFC 3986 the scheme must begin with a letter.
     *
     * [a-zA-Z]
     *
     * Following the first letter of the scheme there can be any
     * combination of letters, digits, plus ("+"), period ("."),
     * or hyphen ("-").
     *
     * [a-zA-Z0-9+\.-]*
     *
     * A colon (":") is required after the scheme.
     *
     * :
     *
     * The hierarchy part precedes the authority when an authority
     * is needed, but it is optional otherwise ("mailto" for example).
     * The authority is terminated by the next slash (after the double),
     * or questions mark ("?") or octothorpe ("#"). See http://tools.ietf.org/html/rfc3986#page-16
     *
     * ([\//]{2}[\//]?)?
     *
     * The authority consists of the userinfo, host, and port subcomponents.
     * Both userinfo and port are optional. See http://tools.ietf.org/html/rfc3986#page-17
     * authority = [ userinfo "@" ] host [ ":" port ]
     *
     * The userinfo subcomponent 
     * The userinfo subcomponent may consist of a user name and, optionally,
     * scheme-specific information about how to gain authorization to access
     * the resource.  The user information, if present, is followed by a
     * commercial at-sign ("@") that delimits it from the host. See http://tools.ietf.org/html/rfc3986#page-17
     * userinfo = *( unreserved / pct-encoded / sub-delims / ":" )
     *
     * ([a-zA-Z0-9-\._~%]+:?([a-zA-Z0-9-\._~%]+)?@)? denotes the userinfo subcomponent
     *
     * Abbreviated Formats:
     * dec-octet = DIGIT                 ; 0-9
     *           / %x31-39 DIGIT         ; 10-99
     *           / "1" 2DIGIT            ; 100-199
     *           / "2" %x30-34 DIGIT     ; 200-249
     *           / "25" %x30-35          ; 250-255
     *
     * reg-name      = *( unreserved / pct-encoded / sub-delims )
     *
     * path = path-abempty    ; begins with "/" or is empty
     *      / path-absolute   ; begins with "/" but not "//"
     *      / path-noscheme   ; begins with a non-colon segment
     *      / path-rootless   ; begins with a segment
     *      / path-empty      ; zero characters
     *
     * path-abempty  = *( "/" segment )
     * path-absolute = "/" [ segment-nz *( "/" segment ) ]
     * path-noscheme = segment-nz-nc *( "/" segment )
     * path-rootless = segment-nz *( "/" segment )
     * path-empty    = 0<pchar>
     *
     * pchar         = unreserved / pct-encoded / sub-delims / ":" / "@"
     *
     * segment       = *pchar
     * segment-nz    = 1*pchar
     * segment-nz-nc = 1*( unreserved / pct-encoded / sub-delims / "@" ) ; non-zero-length segment without any colon ":"
     *
     * pchar         = unreserved / pct-encoded / sub-delims / ":" / "@"
     * query         = *( pchar / "/" / "?" )
     * fragment      = *( pchar / "/" / "?" )
     *
     * pct-encoded   = "%" HEXDIG HEXDIG
     * unreserved    = ALPHA / DIGIT / "-" / "." / "_" / "~"
     * reserved      = gen-delims / sub-delims
     * gen-delims    = ":" / "/" / "?" / "#" / "[" / "]" / "@"
     * sub-delims    = "!" / "$" / "&" / "'" / "(" / ")" / "*" / "+" / "," / ";" / "="
     *
     * @type {RegExp}
     */
    var uriRegex = /^[a-z][a-zA-Z0-9+\.-]*:(([\//]{2}[\//]?)|[^\/])([a-zA-Z0-9-\._~%]+:?([a-zA-Z0-9-\._~%]+)?@)?(([a-zA-Z0-9-._~%!$&'()*+,;=]{0,255})|(([0-9]{1,3}\.){3}[0-9]{1,3})|(\[(v[a-fA-F0-9]+\.[a-zA-Z0-9-\._~!$&'()*+,;=:]+)\])|(?!\..+\])((\[([a-fA-F0-9]{1,4}:){5}((([a-fA-F0-9]{1,4}:){2}[a-fA-F0-9]{1,4})|(:([0-9]{1,3}\.){3}[0-9]{1,3}))\])|(\[([a-fA-F0-9]{1,4}:){1,6}:([a-fA-F0-9]{1,4}:?){1,6}\])))?(:[0-9]+)?((\/[a-zA-Z0-9-._~%!$&'()*+,;=:@]*)*|(\/?[a-zA-Z0-9-._~%!$&'()*+,;=:@](\/?[a-zA-Z0-9-._~%!$&'()*+,;=:@]*)*))?(\?[a-zA-Z0-9-._~%!$&'()*+,;=:@?\/]*)?(#[a-zA-Z0-9-._~%!$&'()*+,;=:@?\/]*)?$/;

    function testUri(str) {
        return uriRegex.test(str);
    }

    module.exports = {
        test: testUri
    };
}(module));