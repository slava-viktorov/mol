namespace $ {

	export function $mol_data_integer( val : number ) {

		const val2 = $mol_data_number( val )
		if( Math.floor( val2 ) === val2 ) return val2
		
		return $mol_fail( new Error( 'is not an integer' ) )
	}
	
}
