// v konzoly muzu napsat let m = new Matrix(3,2) -> napis console.table(m.data)
// u static funkcí musí být vždy return !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
class Matrix {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.data = []; // array
        // fill matrix with zeros
        for (let i = 0; i < this.rows; i++) {
            this.data[i] = [];
            for (let j = 0; j < this.cols; j++) {
                this.data[i][j] = 0;
            }
        }
    }
    // converts array to matrix
    static fromArray(arr) {
        let m = new Matrix(arr.length, 1);
        for (let i = 0; i < arr.length; i++) {
            m.data[i][0] = arr[i];
        }
        return m;
    }

    // converts matrix to array
    toArray() {
        let arr = [];
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                arr.push(this.data[i][j]);
            }
        }
        return arr;
    }

    static subtract(a, b) {
        // Return a new Matrix a-b
        let result = new Matrix(a.rows, a.cols);
        for (let i = 0; i < result.rows; i++) {
            for (let j = 0; j < result.cols; j++) {
                result.data[i][j] = a.data[i][j] - b.data[i][j];
            }
        }
        return result;
    }



    // I want to have let n = Matrix.multiply(a,b)
    // here doing A . B
    static multiply(a, b) {
        // Matrix product
        if (a.cols !== b.rows) {
            console.log('Columns of A must match rows of B.')
            return undefined;
        }
        let result = new Matrix(a.rows, b.cols);
        for (let i = 0; i < result.rows; i++) {
            for (let j = 0; j < result.cols; j++) {
                // Dot product of values in col
                let sum = 0;
                for (let k = 0; k < a.cols; k++) {
                    sum += a.data[i][k] * b.data[k][j];
                }
                result.data[i][j] = sum;
            }
        }
        return result;
    }

    multiply(n) {
        if (n instanceof Matrix) {
            // hadamard product
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                    this.data[i][j] *= n.data[i][j];
                }
            }
        } else {
            // Scalar product
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                    this.data[i][j] *= n;
                }
            }
        }
    }

    // apply a function to every element of a matrix
    map(func) {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                let val = this.data[i][j];
                this.data[i][j] = func(val);
            }
        }
    }

    static map(matrix, fce) {
        let result = new Matrix(matrix.rows, matrix.cols);
        for (let i = 0; i < matrix.rows; i++) {
            for (let j = 0; j < matrix.cols; j++) {
                let val = matrix.data[i][j];
                result.data[i][j] = fce(val);
            }
        }
        return result;
    }

    randomize() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.data[i][j] = Math.random() * 2 - 1;
            }
        }
    }

    add(n) {
        // chcecks is n is data type of Matrix -> predpokladam stejne dimenze
        if (n instanceof Matrix) {
            for (var i = 0; i < this.rows; i++) {
                for (var j = 0; j < this.cols; j++) {
                    this.data[i][j] += n.data[i][j]; // musim referencovat data protoze
                } // tam storuju hodnoty
            }
        } else {
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                    this.data[i][j] += n;
                }
            }
        }
    }

    static transpose(matrix) {
        let result = new Matrix(matrix.cols, matrix.rows);
        for (var i = 0; i < matrix.rows; i++) {
            for (var j = 0; j < matrix.cols; j++) {
                result.data[j][i] = matrix.data[i][j];
            }
        }
        return result;
    }
    // prints matrix to console
    //print() {
    //console.table(this.data);
    // }
}