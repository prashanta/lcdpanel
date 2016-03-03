function LCD(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.space_between_char = 2;

    this.c_row = 0;
    this.c_col = 0;

    this.bit_rows = 8;
    this.bit_cols = 5;
    this.bit_width = 3;
    this.bit_height = 3 ;
    this.space_between_bit = 1;

    this.color_active = "#00FF00";
    this.color_inactive = "#222";

    this.offset_row = 6;
    this.offset_col = 6;

    this.lcd_width = (this.cols * ((this.bit_cols*(this.bit_width + this.space_between_bit)) + this.space_between_char)) + (this.offset_col*2);
    this.lcd_height = (this.rows * ((this.bit_rows*(this.bit_height + this.space_between_bit)) + this.space_between_char)) + (this.offset_row*2);


    this.init = function(){
        // create LCD back ground

        $("canvas").drawRect({
            fillStyle: "#333",
            x: 0,
            y: 0,
            width: this.lcd_width,
            height: this.lcd_height,
            fromCenter: false
        });
        for(var i = 0; i < this.rows; i++) {
            for(var j = 0; j < this.cols; j++){
                for(var k = 0; k < this.bit_rows; k++){
                    for(var l = 0; l < this.bit_cols; l++){
                        this.updateBit(i,j,k,l, this.color_inactive);
                    }
                }
            }
        }
    };

    this.setCursor = function(col, row){
        if(col < this.cols && row < this.rows){
            this.c_row = row;
            this.c_col = col;
        }
    };

    this.updateBit = function (row, col, bitrow, bitcol, color){
        var xoffset = col * ((this.bit_cols*(this.bit_width + this.space_between_bit)) + this.space_between_char);
        var yoffset = row * ((this.bit_rows*(this.bit_height + this.space_between_bit)) + this.space_between_char);

        var _x = this.offset_col + xoffset + (bitcol * (this.bit_width + this.space_between_bit));
        var _y = this.offset_row + yoffset + (bitrow * (this.bit_height + this.space_between_bit));

        $("canvas").drawRect({
            fillStyle: color,
            x: _x,
            y: _y,
            width: this.bit_width,
            height: this.bit_height,
            fromCenter: false
        });
    };

    this.updateChar = function(row, col, val){
        for(var i=0; i<this.bit_rows; i++){
            for(var j=0; j<this.bit_cols; j++){
                var v = val[i][j];
                if(v==1){
                    this.updateBit(row, col, i , j, this.color_active);
                }
            }
        }
    };

    this.updateCharDec = function(row, col, val){
        for(var i=0; i<this.bit_rows; i++){
            var t = 16;
            var v = val[i];
            for(var j=0; j<this.bit_cols; j++){
                if((v & t) > 0){
                    this.updateBit(row, col, i , j, this.color_active);
                }
                t = t >> 1;
            }
        }
    };

    this.write = function(val){
        var r = this.c_row;
        var c = this.c_col;
        for(var i=0; i<val.length; i++){
            if(c >= this.cols){
                console.error("Too many chars on this row");
                break;
            }
            var v = val[i];
            this.clearChar(r,c);
            this.updateCharDec(r,c,charArray[v]);
            c++;
        }
    }

    this.clearChar = function(row,col){
         for(var i=0; i<this.bit_rows; i++){
            for(var j=0; j<this.bit_cols; j++){
                this.updateBit(row, col, i , j, this.color_inactive);
            }
        }
    }

    this.sandbox = function(){

    }
}
