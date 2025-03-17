import React from 'react'
import Container from '../components/styleComponent'

const CreateArticle = () => {
    return (
        <Container>
            <form>
                <div>
                    <div>
                        <input type="text" name='title' placeholder='Title...' />
                        <input type="text" name='description' placeholder='Title...' />
                    </div>
                    <div>
                        <input type="file" name='image' />
                    </div>
                </div>
                <button>Create Article</button>
            </form>
        </Container>
    )
}

export default CreateArticle
