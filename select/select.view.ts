namespace $.$$ {
	export class $mol_select extends $.$mol_select {
		
		@ $mol_mem
		filter_pattern( next? : string ) {
			if( !this.focused() ) return ''
			
			return next || ''
		}

		open() {
			this.options_showed( true )
		}
		
		@ $mol_mem
		options_showed( next? : boolean ) {

			this.focused()

			if( next === undefined ) next = this.filter_pattern().length > 0
			
			if( next && this.Filter() ) new $mol_defer( ()=> this.Filter().focused( true ) )
			
			return next
		}
		
		@ $mol_mem
		options() {
			return Object.keys( this.dictionary() )
		}
		
		@ $mol_mem
		options_filtered() {
			let options = this.options()
			options = options.filter( $mol_match_text( this.filter_pattern() , ( id : string )=> [ this.option_label( id ) ] ) )

			const index = options.indexOf( this.value() )
			if( index >= 0 ) options.splice( index , 1 )
			
			return options
		}
		
		option_label( id : string ) {
			const value = this.dictionary()[ id ]
			return value == null ? id : value
		}
		
		option_rows() {
			if( this.options_filtered().length === 0 ) return [ this.No_options() ]
			
			let options = this.options_filtered().map( ( option : string ) => this.Option_row( option ) )
			
			return options
		}
		
		@ $mol_mem
		option_focused( component? : $mol_view ) {
			if( component == null ) {
				for( let comp of this.nav_components() ) {
					if( comp && comp.focused() ) return comp
				}
				
				return this.Filter()
			}
			
			if( this.options_showed() ) {
				component.focused( true )
			}
			
			return component
		}

		event_select( id : string , event? : MouseEvent ) {
			this.value( id )
			this.focused( false )
		}
		
		nav_components() {
			return [ this.Filter() , ... this.option_rows() ]
		}

		option_content_current() {
			return this.option_content( this.value() )
		}
		
		trigger_content() {
			return ( !this.value() && this.Filter() )
				? [ this.Filter() ]
				: [ ... this.option_content_current() , this.Trigger_icon() ]
		}
		
		menu_content() {
			return ( this.value() && this.Filter() )
				? [ this.Filter() , ... this.option_rows() ]
				: this.option_rows()
		}
		
	}
}
