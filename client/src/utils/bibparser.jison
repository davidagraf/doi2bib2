/* description: Parses end executes mathematical expressions. */

/* lexical grammar */
%lex
%x value
%%
<INITIAL>\s+                      /*return 'WS'*/
<INITIAL>[^@{},=]+                return 'TEXT'
<value>[^{},]+                    return 'TEXT';
<INITIAL>"@"                      return '@'
<*>"{"                            {
                                    this.curleyCount = this.curleyCount || 0;
                                    ++this.curleyCount;
                                    if (this.curleyCount === 2) {
                                      this.begin("value");
                                    }
                                    if (this.curleyCount > 2) {
                                      return 'TEXT';
                                    } else {
                                      return '{';
                                    }
                                  }
<*>"}"                            {
                                    this.curleyCount = this.curleyCount || 0;
                                    --this.curleyCount;
                                    if (this.curleyCount === 1) {
                                      this.popState();
                                    }
                                    if (this.curleyCount > 1) {
                                      return 'TEXT';
                                    } else {
                                      return '}';
                                    }
                                  }
<*>","                            return ','
<INITIAL>"="                      return '='

/lex

%start expressions

%% /* language grammar */

expressions
    : bibtex
        {return $1;}
    | bibtex EOF
        {return $1;}
    ;

bibtex
    : '@' TEXT '{' TEXT tags '}'
        {
          $$ = {
            type: $2,
            id: $4,
            tags: $5
          };
        }
    ;

tags
    : tags ',' TEXT '=' '{' taglist '}'
        {
          if ($6.length === 1) {
            $1[$3.trim()] = $6[0];
          } else {
            $1[$3.trim()] = $6;
          }
          $$ = $1;
        }
    | tags ',' TEXT '=' TEXT
        {
          $1[$3.trim()] = $5;
          $$ = $1;
        }
    |
        {
          $$ = {};
        }
    ;

taglist
    : taglist ',' tagvalue
        {
          $$ = $1;
          $$.push($3);
        }
    | tagvalue
        {
          $$ = [$1];
        }
    ;

tagvalue
    : TEXT tagvalue
        {
          $$ = [$1, $2].join('');
        }
    |
        {
          $$ = '';
        }
    ;
