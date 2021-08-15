describe('Example component', ()=>{
  test('Debe de ser mayor a 10', ()=>{
    let value= 9;

    value +=2;

    expect(value).toBeGreaterThan(10);

  })
})